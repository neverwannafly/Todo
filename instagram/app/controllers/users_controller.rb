class UsersController < ApplicationController
  # wrap_parameters :user, include: [:username, :email, :name, :password, :password_confirmation]

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params

    if @user.save
      respond_to do |format|
        session[:user_id] = @user.id
        format.html { redirect_to posts_url, notice: "Welcome #{@user.username}" }
      end
    else
      puts @user.errors.full_messages
      respond_to do |format|
        format.html { redirect_to signup_url, notice: "Signup Failed!" }
      end
    end
  end

private

  def user_params
    params.require(:user).permit(:password, :password_confirmation, :email, :name, :username)
  end

end
