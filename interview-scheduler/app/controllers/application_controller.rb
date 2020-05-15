class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception 
  helper_methods: set_user, can_edit, can_view, can_update, can_create

private

  def set_user 
    if session[:user_id] 
      @_current_user ||= User.find_by(id: session[:user_id]) 
    else
      @_current_user = nil
  end

  def can_edit
    if @_current_user
      return @_current_user.role._edit
    else
      return false
    end
  end

  def can_view
    if @_current_user
      return @_current_user.role._view
    else
      return false
    end
  end

  def can_update
    if @_current_user
      return @_current_user.role._update
    else
      return false
    end
  end

  def can_create
    if @_current_user
      return @_current_user.role._create
    else
      return false
    end
  end

end
