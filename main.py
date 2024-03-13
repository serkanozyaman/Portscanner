import sys
from PyQt5.QtWidgets import QApplication, QWidget
from ui import Ui_Form
from scanner import port_scan, os_detection

class PortScannerApp(QWidget):
    def __init__(self):
        super().__init__()
        self.ui = Ui_Form()
        self.ui.setupUi(self)
        self.ui.pushButtonScan.clicked.connect(self.scan_button_clicked)

    def scan_button_clicked(self):
        ip_address = self.ui.lineEditIp.text()
        start_port = int(self.ui.lineEditStartPort.text())
        end_port = int(self.ui.lineEditLastPort.text())
        open_ports = port_scan(ip_address, start_port, end_port)
        self.ui.textBrowserOpenPorts.setText("Açık Portlar: " + str(open_ports))

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = PortScannerApp()
    window.show()
    sys.exit(app.exec_())
