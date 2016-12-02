## Server Access

This document describes how to access the development and production server.

### Prerequisites

Before proceding, you will need 3 things:

1. RSA token for princeton servers.
2. NetID and password (this is like the student login for princeton).
3. RSA token pin which is a different password than the one given by the token itself.

If you need to access the development or production servers and you do not have this information, please contact <dtamir@princeton.edu>.

### Background

There are 2 VMs prodvided by princeton's ESS department. More information about the servers can be found at the following link, but only __after you have established a remote connection__ to princeton:  [ESS Wiki on Linux Servers](https://sp.princeton.edu/oit/ess/Wiki/Linux%20Server%20root%20guidelines.aspx)

The host names for the deveopment and production are:

* prson-proj-dev.princeton.edu
* prson-proj-prod.princeton.edu

### Connecting

1. Refer to the following link for how to remotely access princeton's network [http://helpdesk.princeton.edu/kb/display.plx?ID=6023](http://helpdesk.princeton.edu/kb/display.plx?ID=6023)
	*	If the link is dead, the basic process for mac is to download a program called __SonicWall Mobile Connect__. Using the program, connect to a server named Princeton and Server address remote.princeton.edu.  The username and password is the NetID mentiond in the prerequisites.
2. In the terminal, ssh to the epoxy.princeton.edu: `ssh prson_proj@epoxy.princeton.edu`.  The password in this case is the RSA pin concatenated with the SecurID (number generated from the RSA fob).  The RSA pin is mentioned in the prerequisites.
3. Once you have connected to epoxy, ssh to the server of your choice (either prson-proj-dev.princeton.edu or prson-proj-prod.princeton.edu).  Now, use your NetId password.  __DO NOT USE THE RSA FOB__.
4. To get root access type the following: `sudo su root`.  In this case the password is the RSA pin concatenated with the SecurID (number genreated from the RSA fob).

