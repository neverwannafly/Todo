class UsersController < ApplicationController
  
  def new
    @user = User.new
  end

  def create
    user = User.new(
      username: params[:username],
      name: params[:name],
      email: params[:email],
      password_digest: params[:password],
      password_confirmation: params[:password_confirmation],
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
