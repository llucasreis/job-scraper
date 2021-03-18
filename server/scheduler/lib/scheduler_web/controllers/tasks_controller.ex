defmodule SchedulerWeb.TasksController do
  use SchedulerWeb, :controller
  alias Scheduler.Task

  def create(conn, params) do
    with {:ok, task} <- Task.create_task(params) do
      conn
      |> put_status(:created)
      |> render("create.json", task: task)
    end
  end
end
