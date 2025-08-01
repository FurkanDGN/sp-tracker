import Form, { Field } from '@atlaskit/form';
import Select from '@atlaskit/select';
import Editfield from '@atlaskit/textfield';
import Toggle from '@atlaskit/toggle';

import type { FormValues, View } from '../types';

interface Props {
  formValues: FormValues;
  view: View;
}

const timeTypeOptions = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

const themeColors = {
  background: '#1f2937',
  card: '#374151',
  border: '#6b7280',
  textPrimary: '#f9fafb',
  textSecondary: '#9ca3af',
  primary: '#4f46e5',
  primaryHover: '#4338ca',
  secondary: '#374151',
  secondaryHover: '#4b5563',
};

export default function Edit(props: Props) {
  const getTimeTypeValue = () => {
    if (props.formValues.timeType) {
      return props.formValues.timeType.value;
    }
    return 'month';
  };

  const defaultValues = {
    timeNumber: props.formValues.timeNumber || '12',
    timeType: getTimeTypeValue(),
    showUnassigned: props.formValues.showUnassigned || false,
  };

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: themeColors.background,
        color: themeColors.textPrimary,
      }}
    >
      <h2
        style={{
          marginBottom: '24px',
          fontSize: '20px',
          fontWeight: '600',
          color: themeColors.textPrimary,
        }}
      >
        Configure Story Points Dashboard
      </h2>

      <Form<FormValues> onSubmit={(event) => props.view.submit(event)}>
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <Field
                name="timeNumber"
                label={
                  <span style={{ color: themeColors.textSecondary }}>
                    Time Period Number
                  </span>
                }
                defaultValue={defaultValues.timeNumber}
              >
                {({ fieldProps, error }) => (
                  <div style={{ flex: '1' }}>
                    <Editfield
                      {...fieldProps}
                      type="number"
                      min="1"
                      placeholder="Enter number"
                      style={{
                        backgroundColor: themeColors.card,
                        color: themeColors.textPrimary,
                        borderColor: themeColors.border,
                      }}
                    />
                    {error && (
                      <div
                        style={{
                          color: '#ef4444',
                          fontSize: '12px',
                          marginTop: '4px',
                        }}
                      >
                        {error}
                      </div>
                    )}
                  </div>
                )}
              </Field>

              <Field
                name="timeType"
                label={
                  <span style={{ color: themeColors.textSecondary }}>
                    Time Period Type
                  </span>
                }
                defaultValue={timeTypeOptions.find(
                  (opt) => opt.value === defaultValues.timeType,
                )}
              >
                {({ fieldProps, error }) => (
                  <div style={{ flex: '1' }}>
                    <Select
                      {...fieldProps}
                      options={timeTypeOptions}
                      placeholder="Select type"
                    />
                    {error && (
                      <div
                        style={{
                          color: '#ef4444',
                          fontSize: '12px',
                          marginTop: '4px',
                        }}
                      >
                        {error}
                      </div>
                    )}
                  </div>
                )}
              </Field>
            </div>

            <Field
              name="showUnassigned"
              label={
                <span style={{ color: themeColors.textSecondary }}>
                  Show Unassigned
                </span>
              }
              defaultValue={defaultValues.showUnassigned}
            >
              {({ fieldProps }) => (
                <div
                  style={{
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Toggle
                    id={fieldProps.id}
                    isChecked={fieldProps.value}
                    onChange={fieldProps.onChange}
                  />
                  <label
                    htmlFor={fieldProps.id}
                    style={{ color: themeColors.textSecondary }}
                  >
                    Include unassigned story points in the chart
                  </label>
                </div>
              )}
            </Field>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                marginTop: '24px',
              }}
            >
              <button
                type="submit"
                disabled={submitting}
                style={{
                  backgroundColor: themeColors.primary,
                  color: themeColors.textPrimary,
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px 16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  flex: 1,
                  opacity: submitting ? 0.6 : 1,
                  pointerEvents: submitting ? 'none' : 'auto',
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    themeColors.primaryHover)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = themeColors.primary)
                }
              >
                Save Configuration
              </button>

              <button
                type="button"
                onClick={() => props.view.submit(defaultValues)}
                style={{
                  backgroundColor: themeColors.secondary,
                  color: themeColors.textSecondary,
                  border: `1px solid ${themeColors.border}`,
                  borderRadius: '4px',
                  padding: '10px 16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  flex: 1,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    themeColors.secondaryHover)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    themeColors.secondary)
                }
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
}
