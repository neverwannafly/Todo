Rails.application.routes.draw do
  # User authentication views
  get   '/signup',  controller:'users',     action:'new'
  post  '/signup',  controller:'users',     action:'create'
  get   '/login',   controller:'sessions',  action:'new'
  post  '/login',   controller:'sessions',  action:'create'
  get   '/logout',  controller:'sessions',  action:'destroy'
  get   '/user/:id',controller:'users',     action:'profile', as: :profile
  patch '/user/:id',controller:'users',     action:'upload', as: :upload

  # Interview views
  get   '/interviews',          controller:'interviews', action:'index'
  post  '/interviews',          controller:'interviews', action:'create'
  get   '/interviews/:id',      controller:'interviews', action:'user_interviews', as: :user_interviews
  delete'/interviews/:id',      controller:'interviews', action:'delete'
  get   '/interviews/:id/edit', controller:'interviews', action:'edit'
  patch '/interviews/:id',      controller:'interviews', action:'update'

  # API's
  get   '/api/interviews/fetch',  controller:'interviews',  action: 'fetch'
  get   '/api/interviews/get/:id',controller:'interviews',  action: 'get'
  get   '/api/users/fetch',       controller:'users',       action: 'fetch'

  root 'interviews#index'
end
