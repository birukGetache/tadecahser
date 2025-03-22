import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Tabs, Input, Button, Typography, Select, message, Card } from 'antd';
import UserForm from './UserForm';
import UsersList from './UserList';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;
const { Title } = Typography;
const { Option } = Select;

// Sample data for user roles and settings
const userRoles = ['Admin', 'Pharmacist', 'Technician'];
const initialSettings = {
  pharmacyName: 'Example Pharmacy',
  contactEmail: 'contact@example.com',
  openHours: '09:00 - 17:00',
  userRoles: ['Admin', 'Pharmacist'],
};

// Validation schema
const validationSchema = Yup.object({
  pharmacyName: Yup.string().required('Required'),
  contactEmail: Yup.string().email('Invalid email format').required('Required'),
  openHours: Yup.string().required('Required'),
  userRoles: Yup.array().of(Yup.string()).required('Required'),
});

// Styled components
const Container = styled.div`
  padding: 20px;
  height: 90vh;
  overflow-y: auto;
`;

const FormContainer = styled.div`
  margin-bottom: 20px;
`;

const Configuration = () => {
  const setting = useSelector((state) => state.settings);
  const isDarkTheme = setting.displaySettings.theme === 'dark';
  const [settings, setSettings] = useState(initialSettings);

  const handleSubmit = (values) => {
    setSettings(values);
    message.success('Settings saved successfully!');
  };

  const handleReset = () => {
    setSettings(initialSettings);
    message.info('Settings reset to default.');
  };

  return (
    <Container style={{ backgroundColor: isDarkTheme ? '#2c3e50' : '#edf1f5', height:"89vh" , boxSizing:"border-box" }}>
      <Title level={2} style={{ textAlign: 'center', color: isDarkTheme ? '#ecf0f1' : '#2c3e50' }}>
        Pharmacy Configuration
      </Title>

      <Tabs defaultActiveKey="1">
        <TabPane tab="General Settings" key="1">
          <Card title="General Settings" style={{ width: '80%', margin: '0 auto' }}>
            <Formik
              initialValues={settings}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, values }) => (
                <Form>
                  <FormContainer>
                    <label htmlFor="pharmacyName">Pharmacy Name</label>
                    <Field name="pharmacyName">
                      {({ field }) => (
                        <Input
                          {...field}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.pharmacyName}
                          style={{ width: '100%' }}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="pharmacyName" component="div" style={{ color: 'red' }} />
                  </FormContainer>

                  <FormContainer>
                    <label htmlFor="contactEmail">Contact Email</label>
                    <Field name="contactEmail">
                      {({ field }) => (
                        <Input
                          {...field}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.contactEmail}
                          type="email"
                          style={{ width: '100%' }}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="contactEmail" component="div" style={{ color: 'red' }} />
                  </FormContainer>

                  <FormContainer>
                    <label htmlFor="openHours">Open Hours</label>
                    <Field name="openHours">
                      {({ field }) => (
                        <Input
                          {...field}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.openHours}
                          style={{ width: '100%' }}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="openHours" component="div" style={{ color: 'red' }} />
                  </FormContainer>

                  <FormContainer>
                    <label>User Roles</label>
                    <Field name="userRoles">
                      {({ field }) => (
                        <Select
                          mode="multiple"
                          style={{ width: '100%' }}
                          onChange={(value) => field.onChange({ target: { name: field.name, value } })}
                        >
                          {userRoles.map(role => (
                            <Option key={role} value={role}>{role}</Option>
                          ))}
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage name="userRoles" component="div" style={{ color: 'red' }} />
                  </FormContainer>

                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                      Save Changes
                    </Button>
                    <Button onClick={handleReset}>Reset</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card>
        </TabPane>

        <TabPane tab="User Management" key="2">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: '20px' }} className='split'>
            <UserForm />
            <div style={{ overflowY: "auto", height: "60vh" }}>
              <UsersList />
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Container>
  );
};

export default Configuration;
