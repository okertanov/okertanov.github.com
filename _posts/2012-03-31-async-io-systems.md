---
layout: post
title : Event-driven asynchronous I/O systems
tagline:
category : dev
tags : [javascript, lua, c++, .net]
---
{% include JB/setup %}


### Node.js
[nodejs.org](http://nodejs.org/)  

    require('http').createServer(function (req, res){
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World');
    }).listen(8080, '0.0.0.0', function (){
        console.log('Server listening on http://0.0.0.0:8080/');
    });


### Aleph
[github.com/ztellman/aleph](https://github.com/ztellman/aleph)  

    (use 'lamina.core 'aleph.http)

    (defn hello-world [channel request]
      (enqueue channel
        {:status 200
         :headers {"content-type" "text/html"}
         :body "Hello World!"}))

    (start-http-server hello-world {:port 8080})


### Luvit
[luvit.io](http://luvit.io/)  

    local http = require("http")

    http.createServer(function (req, res)
        local body = "Hello world\n"
        res:writeHead(200, {
            ["Content-Type"] = "text/plain",
            ["Content-Length"] = #body
        })
        res:finish(body)
    end):listen(8080)

    print("Server listening at http://localhost:8080/")


### node.native
[github.com/d5/node.native](https://github.com/d5/node.native)  

    #include <iostream>
    #include <native/native.h>
    using namespace native::http;

    int main() {
        http server;
        if(!server.listen("0.0.0.0", 8080, [](request& req, response& res) {
            res.set_status(200);
            res.set_header("Content-Type", "text/plain");
            res.end("C++ FTW\n");
        })) return 1; // Failed to run server.

        std::cout << "Server running at http://0.0.0.0:8080/" << std::endl;
        return native::run();
    }


### Node.net
[github.com/dnewcome/Node.net](https://github.com/dnewcome/Node.net)  

    var sys = require( 'sys' ), http = require( 'http' );
    http.createServer( function( request, response ) {
        request.addListener( 'data', function( data ) {
            sys.puts( data );
        });
        request.addListener( 'end', function() {
            response.write( '<html><body><p>All finished!<p></body></html>' );
            response.end();
        });
    }).listen( 9981, 'localhost' );


### Node.cs
[github.com/Rduerden/Node.cs](https://github.com/Rduerden/Node.cs)  

    public class Webserver : INodeProgram
    {
        public int Main( string[] args )
        {
            new HttpServer( ( IHttpTransaction t ) =>
            {
                Console.WriteLine( "got connection {0}", t.Request.Path );
                t.Response.Write( "<H1>Hello World!</H1>" );
                t.Response.End();
            }, IOLoop.Instance ).Listen( "10.0.2.15", 8080 );
            Console.WriteLine( "listening on 8080" );
            return 0;
        }
    }

### Jetty
[eclipse.org/Jetty](http://wiki.eclipse.org/Jetty/)  

    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpServletResponse;
    import javax.servlet.ServletException;
    import java.io.IOException;
    import org.eclipse.jetty.server.Server;
    import org.eclipse.jetty.server.Request;
    import org.eclipse.jetty.server.handler.AbstractHandler;

    public class HelloWorld extends AbstractHandler
    {
        public void handle(String target,
                           Request baseRequest,
                           HttpServletRequest request,
                           HttpServletResponse response)
            throws IOException, ServletException
        {
            response.setContentType("text/html;charset=utf-8");
            response.setStatus(HttpServletResponse.SC_OK);
            baseRequest.setHandled(true);
            response.getWriter().println("<h1>Hello World</h1>");
        }

        public static void main(String[] args) throws Exception
        {
            Server server = new Server(8080);
            server.setHandler(new HelloWorld());
            server.start();
            server.join();
        }
    }


### Netty
[netty.io](http://netty.io/)  

    import java.net.InetSocketAddress;
    import java.util.concurrent.Executors;
    import io.netty.bootstrap.ServerBootstrap;
    import io.netty.channel.socket.nio.NioServerSocketChannelFactory;

    public class HttpStaticFileServer {
        private final int port;
        public HttpStaticFileServer(int port) { this.port = port; }

        public void run() {
            ServerBootstrap bootstrap = new ServerBootstrap(
                    new NioServerSocketChannelFactory(
                            Executors.newCachedThreadPool()));
            bootstrap.setPipelineFactory(new HttpStaticFileServerPipelineFactory());
            bootstrap.bind(new InetSocketAddress(port));
        }

        public static void main(String[] args) {
            int port = 8080;
            new HttpStaticFileServer(port).run();
        }
    }


### Tornado
[tornadoweb.org](http://www.tornadoweb.org/)  

    import tornado.ioloop
    import tornado.web

    class MainHandler(tornado.web.RequestHandler):
        def get(self):
            self.write("Hello, world")

    application = tornado.web.Application([
        (r"/", MainHandler),
    ])

    if __name__ == "__main__":
        application.listen(8888)
        tornado.ioloop.IOLoop.instance().start()


### Twisted
[twistedmatrix.com](http://twistedmatrix.com/)  

    from twisted.web import server, resource
    from twisted.internet import reactor

    class HelloResource(resource.Resource):
        isLeaf = True
        numberRequests = 0

        def render_GET(self, request):
            self.numberRequests += 1
            request.setHeader("content-type", "text/plain")
            return "I am request #" + str(self.numberRequests) + "\n"

    reactor.listenTCP(8080, server.Site(HelloResource()))
    reactor.run()


### Eventlet
[eventlet.net](http://eventlet.net/)  

    import eventlet

    def handle(client):
        while True:
            c = client.recv(1)
            if not c: break
            client.sendall(c)

    server = eventlet.listen(('0.0.0.0', 6000))
    pool = eventlet.GreenPool(10000)
    while True:
        new_sock, address = server.accept()
        pool.spawn_n(handle, new_sock)


### EventMachine
[rubyeventmachine.com](http://rubyeventmachine.com/)  

    require 'rubygems'
    require 'eventmachine'
    require 'evma_httpserver'

    class Handler  < EventMachine::Connection
        include EventMachine::HttpServer

        def process_http_request
            resp = EventMachine::DelegatedHttpResponse.new( self )
            sleep 2 # Simulate a long running request
            resp.status = 200
            resp.content = "Hello World!"
            resp.send_response
      end
    end

    EventMachine::run {
        EventMachine::start_server("0.0.0.0", 8080, Handler)
        puts "Listening..."
    }


