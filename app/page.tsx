"use client";
import AddPlan from "@/components/addPlan";
import ListSubmissions from "@/components/listSubmissions";
import Spinner from "@/components/spinner";
import { Badge, Button, Card, Table } from "@govtechsg/sgds-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

type Plan = {
  id: string;
  title: string;
  createdAt: Date;
  selectedOption?: {
    submission: {
      place: string;
    };
  };
  _count: {
    submissions: number;
  };
};

export default function Home() {
  const [addModal, setAddModal] = useState<boolean>(false);
  const [listModal, setListModal] = useState<boolean>(false);
  const [planId, setPlanId] = useState<string | null>(null);

  const { data, mutate, error, isLoading } = useSWR("/api/plan", (url) =>
    fetch(url).then((res) => res.json()),
  );

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (!addModal) {
      mutate(); // Fetch again after closing modal
    }
  }, [addModal]);

  const deletePlan = async (id: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      try {
        await fetch(`/api/plan`, {
          method: "DELETE",
          body: JSON.stringify({ id }),
        });
        mutate();
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between pb-4">
        <h2>List of available plans</h2>
        <Button onClick={() => setAddModal(true)}>Add New Plan</Button>
      </div>
      <Card>
        <Card.Body>
          {isLoading ? (
            <Spinner />
          ) : (
            <Table className="text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Picked Option</th>
                  <th>Created On</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map(
                  (
                    plan: {
                      _count: {
                        submissions: number;
                      };
                    } & Plan, // Plan type with count
                    index: number,
                  ) => (
                    <tr key={`row-${plan.id}`}>
                      <td>{index + 1}</td>
                      <td>{plan.title}</td>
                      <td>
                        {plan.selectedOption
                          ? plan.selectedOption.submission.place
                          : "-"}
                      </td>
                      <td>
                        {new Date(plan.createdAt).toLocaleString("en-SG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </td>
                      <td>
                        <Badge
                          pill
                          bg="warning"
                          className="cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${window.location.origin}/${plan.id}`,
                            );
                            alert("Link copied to clipboard!");
                          }}
                        >
                          Copy Link
                        </Badge>
                        <Badge
                          pill
                          bg="info"
                          className="ms-2 cursor-pointer"
                          onClick={() => {
                            setPlanId(plan.id);
                            setListModal(true);
                          }}
                        >
                          View ({plan._count?.submissions})
                        </Badge>
                        <Badge
                          pill
                          bg="success"
                          className="ms-2 cursor-pointer"
                          onClick={async () => {
                            try {
                              await fetch(`/api/plan/${plan.id}`, {
                                method: "PUT",
                                body: JSON.stringify({ id: plan.id }),
                              });
                              mutate();
                            } catch (error) {
                              alert(error);
                            }
                          }}
                        >
                          {plan.selectedOption && "Re-"}Pick Option
                        </Badge>
                        <Badge
                          pill
                          bg="danger"
                          className="ms-2 cursor-pointer"
                          onClick={() => deletePlan(plan.id)}
                        >
                          Delete
                        </Badge>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      <AddPlan show={addModal} onHide={() => setAddModal(false)} />
      {planId && (
        <ListSubmissions
          show={listModal}
          planId={planId}
          onHide={() => setListModal(false)}
        />
      )}
    </>
  );
}
