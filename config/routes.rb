Rails.application.routes.draw do
  resources :tasks
  get '/tasks/mark/:id' => 'tasks#mark', as: 'mark'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
