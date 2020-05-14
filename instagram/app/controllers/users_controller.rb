class UsersController < ApplicationController
  def new
  end
  def create
    user = User.new(
      username: params[:username],
      name: params[:name],
      email: params[:email],
      password_digest: params[:password],
    )
    if user.save
      session[:user_id] = user.id
      flash[:success] = "Successfully Created!"
      redirect_to posts_url
    else
      flash[:warning] = "Invalid Email or Password"
      redirect_to '/signup'
    end
  end
end
