import socket
import struct
from multiprocessing import Pool, Manager

def scan_port(ip_port, open_ports):
    ip_address, port = ip_port
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((ip_address, port))
        if result == 0:
            open_ports.append(port)
        sock.close()
    except (socket.gaierror, socket.error):
        pass

def port_scan(ip_address, start_port, end_port, num_processes=4):
    manager = Manager()
    open_ports = manager.list()
    ip_ports = [(ip_address, port) for port in range(start_port, end_port + 1)]
    with Pool(processes=num_processes) as pool:
        pool.starmap(scan_port, [(ip_port, open_ports) for ip_port in ip_ports])
    return open_ports

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
