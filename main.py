import socket
import struct

def port_scan(ip_address, start_port, end_port):
    open_ports = []
    for port in range(start_port, end_port + 1):
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(1)
            result = sock.connect_ex((ip_address, port))
            if result == 0:
                open_ports.append(port)
            sock.close()
        except socket.gaierror:
            print("Hedef adı çözümlenemedi. Lütfen doğru bir hedef girin.")
        except socket.error:
            print("Sunucuya bağlanırken bir hata oluştu.")
    return open_ports

def service_scan(ip_address, ports):
    for port in ports:
        try:
            service = socket.getservbyport(port)
            print(f"Port {port}: {service} servisi açık")
        except OSError:
            print(f"Port {port}: Bilinmeyen servis")
        except KeyboardInterrupt:
            print("\nTarama kesildi.")

def os_detection(ip_address):
    icmp_packet = struct.pack("BBHHH", 8, 0, 0, 0, 0)
    checksum = calculate_checksum(icmp_packet + b'\x00\x00')
    icmp_packet = struct.pack("BBHHH", 8, 0, checksum, 0, 0)

    icmp_socket = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_ICMP)
    icmp_socket.settimeout(2)

    try:
        icmp_socket.sendto(icmp_packet, (ip_address, 1))

        response, _ = icmp_socket.recvfrom(1024)

        if response[20:28] == icmp_packet[20:28]:
            ttl = response[8]
            if ttl <= 64:
                return "Linux"
            elif ttl <= 128:
                return "Windows"
            else:
                return "Possibly Solaris/AIX"
        else:
            return "Response doesn't match sent packet"
    except socket.timeout:
        return "No response received"
    finally:
        icmp_socket.close()

def calculate_checksum(data):
    checksum = 0
    for i in range(0, len(data), 2):
        checksum += (data[i] << 8) + data[i+1]
    checksum = (checksum >> 16) + (checksum & 0xFFFF)
    checksum = (~checksum) & 0xFFFF
    return checksum

def selection_Mode():
    print("Select scanning mode:")
    print("[1] Service Scan...")
    print("[2] SYN Scan...")
    print("[3] Operation Scan...")
    print("[4] Quit")
    selected_Mode = input("Please select mode: ")
    return selected_Mode

while True:
    print("----------------")
    print("| Welcome PMap |")
    print("----------------")
    ip_address = input("Hedef IP adresini girin: ")
    start_port = int(input("Başlangıç portunu girin: "))
    end_port = int(input("Bitiş portunu girin: "))

    selected_Mode = selection_Mode()
    if selected_Mode == '1':
        print("Service Scan seçildi.")
        open_ports = port_scan(ip_address, start_port, end_port)
        service_scan(ip_address, open_ports)
    elif selected_Mode == '2':
        print("TCP Scan seçildi.")
        port_scan(ip_address,start_port,end_port)
    elif selected_Mode == '3':
        print("Operation Scan seçildi.")
        os_detection(ip_address)
    elif selected_Mode == '4':
        print("Exiting...")
        break
    else:
        print("Selected mode must be in options! Please select again.")
