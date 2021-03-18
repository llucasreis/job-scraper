defmodule Scheduler.Data.Task.Create do
  alias Scheduler.Repo
  alias Scheduler.Domain.Schema.Task

  def execute(params) do
    params
    |> Task.changeset()
    |> Repo.insert()
  end
end
