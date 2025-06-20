"use client";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@workspace/uikit";
import {useState} from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">UIKit Buttons</h2>
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <button className="bg-red-300 text-white hover:bg-blue-700 focus:ring-blue-500">
              hello
            </button>
          </div>

          <div className="flex gap-4 items-center flex-wrap">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="md">
          <ModalHeader title="로그인" onClose={() => setIsOpen(false)} />
          <ModalBody>hello</ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              취소
            </Button>
            <Button onClick={() => setIsOpen(false)}>로그인</Button>
          </ModalFooter>
        </Modal>
      </div>
    </main>
  );
}
