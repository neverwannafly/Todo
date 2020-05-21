class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  helper_method :generate_token
  helper_method :current_user
  helper_method :can_upload
  helper_method :can_edit
  helper_method :can_view
  helper_method :can_delete
  helper_method :can_create

private

  def generate_token
    length = 64
    return rand(36**length).to_s(36)
  end

  def current_user 
    if params[:user_id] && params[:token]
      @_current_user ||= User.find_by(:id => params[:user_id], :token => params[:token])
    end
    return @_current_user
  end
  
  def can_upload
    if current_user && current_user.id == params[:owner_id].to_i
      return true
    else
      return false
    end
  end

  def can_edit
    if current_user
      return current_user.role._edit
    else
      return false
    end
  end

  def can_view
    if current_user
      return current_user.role._view
    else
      return false
    end
  end

  def can_delete
    if current_user
      return current_user.role._delete
    else
      return false
    end
  end

  def can_create
    if current_user
      return current_user.role._create
    else
      return false
    end
  end

end
