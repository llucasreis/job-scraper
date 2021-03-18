defmodule Scheduler.Domain.Schema.Task do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, Ecto.UUID, autogenerate: true}

  schema "tasks" do
    field :user_email, :string
    field :platform, :string
    field :site_url, :string
    timestamps()
  end

  @required_params [:user_email, :platform, :site_url]

  def changeset(task \\ %__MODULE__{}, params) do
    task
    |> cast(params, @required_params)
    |> validate_required(@required_params)
    |> validate_format(:user_email, ~r/@/)
  end
end
