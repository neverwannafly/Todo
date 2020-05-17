Rails.application.routes.draw do
  # User authentication views
  get   '/signup',  controller:'users',     action:'new'
  post  '/signup',  controller:'users',     action:'create'
  get   '/login',   controller:'sessions',  action:'new'
  post  '/login',   controller:'sessions',  action:'create'
  get   '/logout',  controller:'sessions',  action:'destroy'

  # Interview views
  get   '/interviews',      controller:'interviews', action:'index'
  post  '/interviews',      controller:'interviews', action:'create'
  get   '/interviews/:id',  controller:'interviews', action:'user_interviews', as: :user_interviews

  # API's
  get   '/api/interviews/fetch',  controller:'interviews',  action: 'fetch'
  get   '/api/interviews/get/:id',controller:'interviews',  action: 'get'
  get   '/api/users/fetch',       controller:'users',       action: 'fetch'

  root 'interviews#index'
end
