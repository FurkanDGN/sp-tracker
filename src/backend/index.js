import api, { route } from '@forge/api';
import Resolver from '@forge/resolver';
import { log } from 'frontend/src/helpers';

const resolver = new Resolver();

resolver.define('getStoryPointsData', async (request) => {
  const {
    timeNumber = '12',
    timeType = 'month',
    showUnassigned = false,
  } = request.payload || {};
  const periodsToFetch = parseInt(timeNumber);
  const actualTimeType =
    typeof timeType === 'object' ? timeType.value : timeType;

  const now = new Date();
  let startDate, endDate;
  let dateKeys = [];

  switch (actualTimeType) {
    case 'day':
      startDate = new Date(
        now.getTime() - (periodsToFetch - 1) * 24 * 60 * 60 * 1000,
      );
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(now);
      endDate.setHours(23, 59, 59, 999);

      for (let i = periodsToFetch - 1; i >= 0; i--) {
        const dayDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dayKey = dayDate.toISOString().split('T')[0];
        const dayName = dayDate.toLocaleDateString('en', {
          month: 'short',
          day: 'numeric',
        });
        dateKeys.push({ key: dayKey, name: dayName });
      }
      break;

    case 'week': {
      const currentWeekStart = new Date(now);
      currentWeekStart.setDate(now.getDate() - now.getDay());
      currentWeekStart.setHours(0, 0, 0, 0);

      startDate = new Date(
        currentWeekStart.getTime() -
          (periodsToFetch - 1) * 7 * 24 * 60 * 60 * 1000,
      );
      endDate = new Date(now);
      endDate.setHours(23, 59, 59, 999);

      // Generate week keys
      for (let i = periodsToFetch - 1; i >= 0; i--) {
        const weekStart = new Date(
          currentWeekStart.getTime() - i * 7 * 24 * 60 * 60 * 1000,
        );
        const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
        const weekKey = `${weekStart.getFullYear()}-W${Math.ceil((weekStart.getDate() + weekStart.getDay()) / 7)}`;
        const weekName = `${weekStart.toLocaleDateString('en', {
          month: 'short',
          day: 'numeric',
        })} - ${weekEnd.toLocaleDateString('en', { month: 'short', day: 'numeric' })}`;
        dateKeys.push({
          key: weekKey,
          name: weekName,
          start: weekStart,
          end: weekEnd,
        });
      }
      break;
    }
    case 'month':
    default:
      startDate = new Date(
        now.getFullYear(),
        now.getMonth() - (periodsToFetch - 1),
        1,
      );
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

      // Generate month keys
      for (let i = periodsToFetch - 1; i >= 0; i--) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`;
        const monthName = monthDate.toLocaleDateString('en', {
          month: 'short',
          year: '2-digit',
        });
        dateKeys.push({ key: monthKey, name: monthName });
      }
      break;
  }

  try {
    const jql = `resolutiondate >= "${startDate.toISOString().split('T')[0]}" AND resolutiondate <= "${endDate.toISOString().split('T')[0]}" AND "Story point estimate" is not EMPTY`;

    const response = await api
      .asUser()
      .requestJira(
        route`/rest/api/3/search?jql=${jql}&fields=assignee,customfield_10016,resolutiondate&maxResults=1000`,
      );
    const data = await response.json();

    if (!response.ok) {
      log.error('API Error:', data);
      return [];
    }

    const periodsData = {};
    dateKeys.forEach(({ key, name }) => {
      periodsData[key] = {
        month: name,
        data: {},
      };
    });

    data.issues.forEach((issue) => {
      const targetDate = issue.fields.resolutiondate;
      if (!targetDate) {
        log.warn(`Issue without resolved date:`, issue.key);
        return;
      }

      const resolutionDate = new Date(targetDate);
      let periodKey;

      switch (actualTimeType) {
        case 'day':
          periodKey = resolutionDate.toISOString().split('T')[0];
          break;

        case 'week': {
          const weekInfo = dateKeys.find(
            ({ start, end }) =>
              start && end && resolutionDate >= start && resolutionDate <= end,
          );
          periodKey = weekInfo?.key;
          break;
        }
        case 'month':
        default:
          periodKey = `${resolutionDate.getFullYear()}-${String(resolutionDate.getMonth() + 1).padStart(2, '0')}`;
          break;
      }

      if (periodKey && periodsData[periodKey]) {
        const assignee = issue.fields.assignee?.displayName || 'Unassigned';
        const storyPoints = issue.fields.customfield_10016 || 0;

        if (!showUnassigned && assignee === 'Unassigned') {
          return;
        }

        periodsData[periodKey].data[assignee] =
          (periodsData[periodKey].data[assignee] || 0) + storyPoints;
      }
    });

    return dateKeys.map(({ key }) => periodsData[key]);
  } catch (error) {
    log.error('Error fetching story points data:', error);
    return [];
  }
});

export const handler = resolver.getDefinitions();
