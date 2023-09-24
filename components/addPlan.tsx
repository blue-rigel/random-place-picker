import { Button, Form, Modal } from "@govtechsg/sgds-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type AddPlanProps = {
  show: boolean;
  onHide: () => void;
};

type FormInput = {
  title: string;
};

export default function AddPlan({ show, onHide }: AddPlanProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<FormInput> = async (data: FormInput) => {
    setLoading(true);
    try {
      await fetch("/api/plan", {
        method: "POST",
        body: JSON.stringify({ title: data.title }),
      });
      reset();
      onHide();
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-exclamation-triangle me-3"></i>Create New Plan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Plan Title</Form.Label>
            <Form.Text className="text-muted">
              A simple description on what the plan is about
            </Form.Text>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 5,
                  message: "Title must be at least 5 characters",
                },
              })}
            />
            {errors.title && (
              <Form.Text className="text-danger">
                <small>{errors?.title.message}</small>
              </Form.Text>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            Add Plan
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
