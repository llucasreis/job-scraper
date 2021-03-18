defmodule Scheduler.Task do
  alias Scheduler.Data.Task

  defdelegate create_task(params), to: Task.Create, as: :execute
end
