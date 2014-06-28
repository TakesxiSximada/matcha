# -*- coding: utf-8 -*-
import six
import os
import sys
import argparse

if six.PY2:
    import ConfigParser as configparser
else:  # for py3k
    import configparser

from azoth.sessions import (
    SessionSetup,
    DEFAULT_TARGET,
    )

from tornado.web import (
    RequestHandler,
    StaticFileHandler,
    )

from azoth.sessions import SessionManager

import mako.lookup
class RequestHandlerForMako(RequestHandler):
    def create_template_loader(self, path):
        pass

class DummyHandler(RequestHandler):
    def get(self):
        manager = SessionManager()
        self.write('hello world' + self.request.uri)

class IndexHandler(RequestHandler):
    def get(self):
        self.render('index.html')

class CaptureHandler(RequestHandler):
    def get(self):
        self.render('capture.html')

    def post(self):

        capture = self.request.files['capture'][0]
        content_type = capture['content_type']
        body = capture['body']
        filename = capture['filename']
        name = filename.split('_')[0]

        import io
        from PIL import (
            Image,
            ImageDraw,
            ImageFont,
            )
        fp = io.BytesIO(body)
        img = Image.open(fp)
        draw = ImageDraw.Draw(img)
        font = ImageFont.truetype('/Library/Fonts/Arial.ttf', 15)

        draw.text(
            (10, 10),  # position
            name,
            font=font,
            fill='#000',  # color
            )

        img.save(
            filename,
            'bmp',
            quality=100,
            optimize=True,
            )
        self.redirect('/capture')

class CollectionHandler(RequestHandler):
    def get(self):
        self.render('collection.html')

class LoginHandler(RequestHandler):
    def get(self):
        manager = SessionManager()
        self.render('login.html')

    def post(self):
        self.redirect('/')

from tornado.web import Application
import tornado.ioloop
def main(argv=sys.argv[1:]):
    parser = argparse.ArgumentParser()
    parser.add_argument('-c', '--conf', default='production.ini')
    opts = parser.parse_args(argv)

    conf = configparser.SafeConfigParser()
    conf.read([opts.conf])

    SessionSetup.setup_from_file(opts.conf, name=DEFAULT_TARGET)

    application = Application([
        (r'/', IndexHandler),
        (r'/auth/login', LoginHandler),
        (r'/auth/logout', DummyHandler),
        (r'/setting', DummyHandler),
        (r'/capture', CaptureHandler),
        (r'/collection', CollectionHandler),
        (r'/report', DummyHandler),
        (r'/bower_components/(.*)', StaticFileHandler,
         {'path': os.path.join(os.path.dirname(__file__), "bower_components")}),
        (r'/styles/(.*)', StaticFileHandler,
         {'path': os.path.join(os.path.dirname(__file__), "app/styles")}),
        (r'/scripts/(.*)', StaticFileHandler,
         {'path': os.path.join(os.path.dirname(__file__), "app/scripts")}),
        ],
        template_path=os.path.join(os.path.dirname(__file__), "app"),
        static_path=os.path.join(os.path.dirname(__file__), "app/static"),
        debug=True,
        #xsrf_cookies=True,
        )
    application.listen(8888)
    iolooper = tornado.ioloop.IOLoop.instance()
    iolooper.start()

if __name__ == '__main__':
    main()
