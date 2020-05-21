class SessionsController < ApplicationController
  
  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      if @user.token == nil
        @user.token = generate_token
        @user.save
      end
      render json: {
        :success => true,
        :user => {
          :id => @user.id,
          :name => @user.name,
          :email => @user.email,
          :token => @user.token,
          :username => @user.username,
        }
      }
    else
      render json: {
        :success => false,
        :error => "Invalid username or password",
      }
    end
  end

  def destroy
    current_user.token = generate_token
    render json: {
      :success => true
    }
  end

private

  def session_params
    params.require(:user).permit(:password, :email)
  end

end