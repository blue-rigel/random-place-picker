import { Button, Modal } from "@govtechsg/sgds-react";
import useSWR from "swr";
import Spinner from "./spinner";
import { useEffect } from "react";
import { Submission } from "@prisma/client";

type ListSubmissionProps = {
  show: boolean;
  planId: string;
  onHide: () => void;
};

export default function ListSubmissions({
  show,
  onHide,
  planId,
}: ListSubmissionProps) {
  const { data, error, isLoading } = useSWR(`/api/${planId}`, (url) =>
    fetch(url).then((res) => res.json()),
  );

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-exclamation-triangle me-3"></i>View Submissions
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
        {isLoading ? (
          <Spinner />
        ) : (
          <ul>
            {data?.data?.map((submission: Submission) => (
              <li key={submission.id}>
                <b>{submission.place}</b> ({submission.name})
                <br /> {submission.desc}
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
