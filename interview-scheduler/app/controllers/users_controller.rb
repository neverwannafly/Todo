class UsersController < ApplicationController

  def create
    @user = User.new user_params
    @user.token = generate_token
    @user.role = Role.find(params[:user][:role_id])
    if @user.role && @user.role.authenticate(params[:user][:role_token])
      if @user.save
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
          :error => @user.errors.full_messages,
        }
      end
    else
      render json: {
        :success => false,
        :error => "Invalid access token or Role ID",
      }
    end
  end

  def profile
    if can_view
      user = User.find(params[:resume_owner])
      if user
        if user.resume.attached?
          render json: {
            success: true,
            resume: url_for(user.resume),
          }
        else
          render json: {
            success: false,
            error: "No attachement found",
          }
        end
      else
        render json: {
          :success => false,
          :error => "User doesnt exists",
        }
      end
    else
      render json: {
        :success => false,
        :error => "Insufficient permissions to view post."
      }
    end
  end

  def upload
    if can_upload
      @user = User.find(params[:owner_id])
      @user.resume.attach(params[:resume])
      @user.save
      render json: {
        success: true,
      }
    else
      render json: {
        success: false,
        error: "Not owner of this account",
      }
    end
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
