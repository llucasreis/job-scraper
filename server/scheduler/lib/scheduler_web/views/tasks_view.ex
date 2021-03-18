defmodule SchedulerWeb.TasksView do
  alias Scheduler.Domain.Schema.Task

  def render("create.json", %{
        task: %Task{id: id, user_email: user_email, platform: platform, site_url: site_url}
      }) do
    %{
      id: id,
      user_email: user_email,
      platform: platform,
      site_url: site_url
    }
  end
end
