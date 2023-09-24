"use client";
import { Alert, Button, Card, Form } from "@govtechsg/sgds-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../globals.scss";

type FormInput = {
  name: string;
  place: string;
  desc?: string;
};

export default function AddSubmission({
  params,
}: {
  params: { planId: string };
}) {
  const { planId } = params;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      place: "",
      desc: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit: SubmitHandler<FormInput> = async (data: FormInput) => {
    setLoading(true);
    try {
      await fetch(`/api/plan/${planId}`, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      setSubmitted(true);
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  return (
    <>
      {submitted ? (
        <Alert variant="success" className="d-flex align-items-center">
          <div>
            <i className="bi bi-exclamation-circle me-4"></i>We have received
            your submission. Thank you!
          </div>
        </Alert>
      ) : (
        <>
          <h2 className="mb-4">Add your submission</h2>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Text className="text-muted">
                    Enter your name for reference
                  </Form.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                  />
                  {errors.name && (
                    <Form.Text className="text-danger">
                      <small>{errors?.name.message}</small>
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Place Name</Form.Label>
                  <Form.Text className="text-muted">
                    Enter your option / place name
                  </Form.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter Place Name"
                    {...register("place", {
                      required: "Place Name is required",
                      minLength: {
                        value: 3,
                        message: "Place must be at least 3 characters",
                      },
                    })}
                  />
                  {errors.place && (
                    <Form.Text className="text-danger">
                      <small>{errors?.place.message}</small>
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Place Description</Form.Label>
                  <Form.Text className="text-muted">
                    Feel free to describe why you like this place
                  </Form.Text>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter Place Description"
                    {...register("desc")}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
}
