AP Garage Door Opener
=====================

### Get Started:

**To Install:**

```
npm install
sudo npm install -d forever
```

Copy the garage file to `/etc/init.d`

The serial server will not run without the serial connection active. comment those parts out to test.

### Project details

Here is what I used:

- Raspberry Pi
- USB Wifi adaptor that supports AP
- Arduino
- Simple Relay Shield kit by Evil Mad Scientist

My garage door is the type where there is a button that shorts two of the terminals together and that triggers an open or close (or stop) depending on what state the door is in. So I added a pair of wires to the terminals and connected that to the Common + N.O. (Normal Open) terminals of the Relay Shield.

I wrote a simple sketch to accept a command on the serial port, and if "toggle" is sent, that would trigger the door to open. I tested this out with my laptop and the Arduino and it worked out. The next step was to replace the laptop with a Pi.

I wanted to use my phone to control this and the garage is not within range of wifi, so I had to make my own wifi. I had a usb wifi dongle that happen to support AP mode and with a little help from some handy guides I was able to make the Pi accept connections and serve IP addresses. 

I used the following Guides to help make the Access Point:

- http://learn.adafruit.com/setting-up-a-raspberry-pi-as-a-wifi-access-point/overview
- http://elinux.org/RPI-Wireless-Hotspot

So I could now get on the Pi, but I needed to serve a page to do the serial communication to the Arduino. I wrote a simple server in node.js. The server will serve static content and there is a route to address the serial port and send "toggle". I used getbootstrap.com for handy css and js magic.

I also had a make a simple init.d script to allow me to start the server on boot.

It works! It was fun to make and it only took a few hours of wrangling parts together and a little bit of software. This could have been done much more simply by the Pi activating the Relay Shield board directly, or if i had ethernet access in my my garage I could have avoided making the Pi into a AP. But I kept it simple at this moment, I can always tear it down and rebuild it smaller. I just used things I had lying around. 