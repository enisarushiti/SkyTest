import cgi
from google.appengine.api import users
import webapp2
from google.appengine.ext.webapp import template
import os
import urllib
from google.appengine.ext import ndb
import jinja2
import webapp2

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class MainPage(webapp2.RequestHandler):
    def get(self):
        if self.request.url.endswith('/'):
            path = '%sindex.html'%self.request.url

        self.redirect(path)

    def post(self):
        self.get()

class Guestbook(webapp2.RequestHandler):
    def post(self):
        self.response.write('<html><body>You wrote:<pre>')
        self.response.write(cgi.escape(self.request.get('content')))
        self.response.write('</pre></body></html>')

application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/sign', Guestbook),
], debug=True)