import type { Meta, StoryObj } from '@storybook/angular';
import { LoginFormComponent } from './login-form.component';

const meta: Meta<LoginFormComponent> = {
  title: 'Auth/Login Form',
  component: LoginFormComponent,
  argTypes: {
    submitForm: {
      action: 'submitted',
    },
  },
};
export default meta;

export const Default: StoryObj<LoginFormComponent> = {
  args: {},
};
