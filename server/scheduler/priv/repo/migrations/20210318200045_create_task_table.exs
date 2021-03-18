defmodule Scheduler.Repo.Migrations.CreateTaskTable do
  use Ecto.Migration

  def change do
    create table(:tasks, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :user_email, :string
      add :platform, :string
      add :site_url, :string
      timestamps()
    end
  end
end
