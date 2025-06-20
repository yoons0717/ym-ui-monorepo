import type {Meta, StoryObj} from "@storybook/react-vite";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
} from "@workspace/uikit";

import "@workspace/uikit/dist/index.css";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {type: "select"},
      options: ["default", "outlined", "elevated"],
    },
    padding: {
      control: {type: "select"},
      options: ["none", "sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is a basic card with some content.",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "This is an outlined card.",
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    children: "This is an elevated card with shadow.",
  },
};

export const WithCompoundComponents = {
  render: () => (
    <Card variant="elevated" style={{width: "400px"}}>
      <CardHeader>
        <h3 style={{margin: 0, fontSize: "1.25rem", fontWeight: "600"}}>
          로그인
        </h3>
      </CardHeader>
      <CardBody>
        <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
          <Input label="이메일" placeholder="example@email.com" />
          <Input label="비밀번호" type="password" placeholder="••••••••" />
        </div>
      </CardBody>
      <CardFooter>
        <div style={{display: "flex", gap: "0.5rem"}}>
          <Button variant="outline" style={{flex: 1}}>
            취소
          </Button>
          <Button variant="primary" style={{flex: 1}}>
            로그인
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

export const PaddingVariants = {
  render: () => (
    <div style={{display: "flex", gap: "1rem", flexWrap: "wrap"}}>
      <Card padding="sm">Small Padding</Card>
      <Card padding="md">Medium Padding</Card>
      <Card padding="lg">Large Padding</Card>
      <Card padding="none" style={{border: "1px solid #e5e7eb"}}>
        No Padding
      </Card>
    </div>
  ),
};
