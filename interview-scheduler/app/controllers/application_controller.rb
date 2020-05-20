class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception 
  helper_method :current_user
  helper_method :can_edit
  helper_method :can_view
  helper_method :can_delete
  helper_method :can_create

private

  def generate_token
    length = 64
    return rand(36**length).to_s(36)
  end

  def validate_token(token)
    return current_user.token == token
  end

  def current_user 
    if session[:user_id] 
      @_current_user ||= User.find_by(id: session[:user_id]) 
    else
      @_current_user = nil
    end
    return @_current_user
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
