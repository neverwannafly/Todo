Rails.application.routes.draw do
  # User authentication views
  get   '/signup',  controller:'users',     action:'new'
  post  '/signup',  controller:'users',     action:'create'
  get   '/login',   controller:'sessions',  action:'new'
  post  '/login',   controller:'sessions',  action:'create'
  get   '/logout',  controller:'sessions',  action:'destroy'

  # Interview views
  get   '/interviews', controller:'interviews', action:'index'
  post  '/interviews', controller:'interviews', action:'create'

  # API's
  get   '/interviews/fetch',  controller:'interviews',  action: 'fetch'
  get   '/users/fetch',       controller:'users',       action: 'fetch'

  root 'interviews#index'
end
