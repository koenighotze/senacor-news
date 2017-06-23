provider "aws" {
  region = "eu-west-1"
}

resource "aws_instance" "senacor-aktuell" {
  instance_type = "t2.micro"
  ami = "ami-a8d2d7ce"

  key_name = "aws-30-days"

  vpc_security_group_ids = ["${aws_security_group.sec-group.id}"]

  provisioner "local-exec" {
    command = "echo ${aws_instance.senacor-aktuell.public_ip} > ip_address.txt"
  }

  provisioner "local-exec" {
    command = "pushd .. && npm run package"
  }

  provisioner "file" {
    source      = "../build/senacor-news.tgz"
    destination = "senacor-news.tgz"

    connection {
      timeout = "5m"
      user = "ubuntu"
    }
  }

  provisioner "remote-exec" {
    inline = [
      "curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -",
      "sudo apt-get install nodejs",
      "tar --warning=no-unknown-keyword -tvf senacor-news.tar"
    ]

    connection {
      timeout = "10m"
      user = "ubuntu"
    }
  }

  tags {
    Name = "senacor-aktuell"
    Owner = "dschmitz"
    Costcenter = "tecco"
  }
}

resource "aws_security_group" "sec-group" {
  name = "senacor-aktuelles"

  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 8000
    to_port = 8000
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags {
    Owner = "dschmitz"
    Costcenter = "tecco"
  }
}

resource "aws_eip" "ip" {
  instance = "${aws_instance.senacor-aktuell.id}"
}

output "ip" {
  value  = "${aws_eip.ip.public_ip}"
}


