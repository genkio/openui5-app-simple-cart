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
  :html => list_purchase(data)
end

def list_purchase(data)
  html = "<!doctype html><html><head><body><h1>\
          Your order with total price #{data['order']['totalPrice']} had been placed.</h1>\
          <h2>Purchase List:</h2>\
          <ul>"
  data.first[1]['entries'].each do |entry|
    html += "#{entry[-1]['ProductName']} x #{entry[-1]['Quantity']} ($#{entry[-1]['Price']} each)</li>"
  end
  html += "</ul></body></html>"
  return html
end