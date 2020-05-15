class SessionsController < ApplicationController
  def new
    @user = User.new
  end
  
  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      respond_to do |format|
        session[:user_id] = @user.id
        set_user
        puts @_current_user
        format.html { redirect_to interviews_url, notice: "Welcome #{@user.username}" }
      end
    else
      respond_to do |format|
        format.html { redirect_to login_url, notice: "Password or Email isnt right!" }
      end
    end
  end

  def destroy
    respond_to do |format|
      session[:user_id] = nil
      set_user
      format.html { redirect_to login_url, notice: "Successfully Logged out" }
    end
  end

private

  def session_params
    params.require(:user).permit(:password, :email)
  end

end