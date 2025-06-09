import type {Meta} from "@storybook/react-vite";
import {Modal, ModalHeader, ModalBody, ModalFooter} from "@ym-ui/uikit";
import {Button} from "@ym-ui/uikit";
import {Input} from "@ym-ui/uikit";
import {useState} from "react";
import "@ym-ui/uikit/dist/index.css";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;

export const BasicModal = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <ModalHeader title="Basic Modal" onClose={() => setIsOpen(false)} />
          <ModalBody>
            <p>This is a basic modal example.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const LoginModal = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Login Modal</Button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="md">
          <ModalHeader title="로그인" onClose={() => setIsOpen(false)} />
          <ModalBody>
            <div
              style={{display: "flex", flexDirection: "column", gap: "1rem"}}
            >
              <Input label="이메일" placeholder="example@email.com" fullWidth />
              <Input
                label="비밀번호"
                type="password"
                placeholder="••••••••"
                fullWidth
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              취소
            </Button>
            <Button onClick={() => setIsOpen(false)}>로그인</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};
