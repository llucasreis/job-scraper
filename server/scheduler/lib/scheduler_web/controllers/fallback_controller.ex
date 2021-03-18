defmodule SchedulerWeb.FallbackController do
  use SchedulerWeb, :controller

  def call(conn, {:error, result}) do
    conn
    |> put_status(:bad_request)
    |> put_view(SchedulerWeb.ErrorView)
    |> render("400.json", result: result)
  end
end
