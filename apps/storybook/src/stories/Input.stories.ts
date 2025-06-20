import type {Meta, StoryObj} from "@storybook/react-vite";
import {Input} from "@workspace/uikit";
import "@workspace/uikit/dist/index.css";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {type: "select"},
      options: ["default", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "텍스트를 입력하세요",
  },
};

export const WithLabel: Story = {
  args: {
    label: "이메일",
    placeholder: "example@email.com",
  },
};

export const WithError: Story = {
  args: {
    label: "비밀번호",
    type: "password",
    error: "비밀번호가 올바르지 않습니다",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "사용자명",
    placeholder: "사용자명을 입력하세요",
    helperText: "3-20자의 영문, 숫자만 사용 가능합니다",
  },
};
