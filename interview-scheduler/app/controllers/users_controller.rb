class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    @user.role = Role.find(params[:user][:role_id])
    if @user.role && @user.role.authenticate(params[:user][:role_token])
      if @user.save
        respond_to do |format|
          session[:user_id] = @user.id
          format.html { redirect_to interviews_url, notice: "Welcome #{@user.username}" }
        end
      else
        respond_to do |format|
          format.html { redirect_to signup_url, notice: "Signup Failed!" }
        end
      end
    else
      respond_to do |format|
        format.html { redirect_to signup_url, notice: "Invalid Access Token or Role ID!" }
      end
    end
  end

  def profile
    @user = User.find(params[:id])
  end

  def upload
    @user = User.find(params[:id])
    @user.resume.attach(params[:user][:resume])
    @user.save
    redirect_to upload_path, notice: "Resume uploaded Successfully!"
  end

  def fetch
    users = User.where "username like ?", "%#{params[:query]}%"
    render json: users
  end

private

  def user_params
    params.require(:user).permit(:password, :password_confirmation, :email, :name, :username)
  end

end
