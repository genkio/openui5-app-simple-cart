require 'sinatra'
require 'rest-client'
require 'pry'

set :public_folder, File.dirname(__FILE__) + '/app'
set :server, 'webrick'

get '/' do
  html :index
end

post '/mailgun/send' do
	# binding.pry
	send_mail(params)
end

def html(view)
  File.read("app/#{view.to_s}.html")
end

def send_mail(data)
  # binding.pry
  RestClient.post "https://api:key-5e21b020fb563e7934063d5758ac3806"\
  "@api.mailgun.net/v3/sandbox9875516d31544ebb87a2892b834cc82e.mailgun.org/messages",
  :from => "admin@simple-cart.herokuapp.com",
  :to => data['userMail'],
  :subject => "Thank you for shopping with us",
  :text => "Your order with total price #{data['order']['totalPrice']} had been placed."
end