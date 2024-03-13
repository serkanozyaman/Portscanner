from PyQt5 import QtCore, QtGui, QtWidgets

class Ui_Form(object):
    def setupUi(self, Form):
        Form.setObjectName("Form")
        Form.resize(800, 600)
        Form.setStyleSheet("background-color:#000000;")
        self.lineEditIp = QtWidgets.QLineEdit(Form)
        self.lineEditIp.setGeometry(QtCore.QRect(140, 50, 311, 41))
        font = QtGui.QFont()
        font.setFamily("Segoe UI Semibold")
        font.setPointSize(11)
        font.setBold(True)
        font.setWeight(75)
        self.lineEditIp.setFont(font)
        self.lineEditIp.setStyleSheet("QLineEdit {\n"
                                     "    border: 2px solid;\n"
                                     "    border-color:    black;\n"
                                     "     border-radius: 15px;\n"
                                     "    background-color:#FF9408\n"
                                     "}")
        self.lineEditIp.setObjectName("lineEditIp")
        self.lineEditStartPort = QtWidgets.QLineEdit(Form)
        self.lineEditStartPort.setGeometry(QtCore.QRect(140, 100, 141, 41))
        font = QtGui.QFont()
        font.setFamily("Segoe UI Semibold")
        font.setPointSize(11)
        font.setBold(True)
        font.setWeight(75)
        self.lineEditStartPort.setFont(font)
        self.lineEditStartPort.setStyleSheet("QLineEdit {\n"
                                             "    border: 2px solid;\n"
                                             "    border-color:    black;\n"
                                             "     border-radius: 15px;\n"
                                             "    background-color:#FF9408\n"
                                             "}")
        self.lineEditStartPort.setObjectName("lineEditStartPort")
        self.lineEditLastPort = QtWidgets.QLineEdit(Form)
        self.lineEditLastPort.setGeometry(QtCore.QRect(290, 100, 161, 41))
        font = QtGui.QFont()
        font.setFamily("Segoe UI Semibold")
        font.setPointSize(11)
        font.setBold(True)
        font.setWeight(75)
        self.lineEditLastPort.setFont(font)
        self.lineEditLastPort.setStyleSheet("QLineEdit {\n"
                                            "    border: 2px solid;\n"
                                            "    border-color:    black;\n"
                                            "     border-radius: 15px;\n"
                                            "    background-color:#FF9408\n"
                                            "}")
        self.lineEditLastPort.setObjectName("lineEditLastPort")
        self.label = QtWidgets.QLabel(Form)
        self.label.setGeometry(QtCore.QRect(40, 50, 91, 41))
        font = QtGui.QFont()
        font.setFamily("Segoe UI Semibold")
        font.setPointSize(11)
        font.setBold(True)
        font.setWeight(75)
        self.label.setFont(font)
        self.label.setStyleSheet("QLabel {\n"
                                "    border: 2px solid;\n"
                                "    border-color:    black;\n"
                                "     border-radius: 15px;\n"
                                "    background-color:#FF9408\n"
                                "}")
        self.label.setObjectName("label")
        self.label_2 = QtWidgets.QLabel(Form)
        self.label_2.setGeometry(QtCore.QRect(40, 100, 91, 41))
        font = QtGui.QFont()
        font.setFamily("Segoe UI Semibold")
        font.setPointSize(11)
        font.setBold(True)
        font.setWeight(75)
        self.label_2.setFont(font)
        self.label_2.setStyleSheet("QLabel{\n"
                                   "    border: 2px solid;\n"
                                   "    border-color:    black;\n"
                                   "     border-radius: 15px;\n"
                                   "    background-color:#FF9408\n"
                                   "}")
        self.label_2.setObjectName("label_2")
        self.pushButtonScan = QtWidgets.QPushButton(Form)
        self.pushButtonScan.setGeometry(QtCore.QRect(460, 100, 121, 41))
        font = QtGui.QFont()
        font.setFamily("Segoe UI Semibold")
        font.setPointSize(11)
        font.setBold(True)
        font.setWeight(75)
        self.pushButtonScan.setFont(font)
        self.pushButtonScan.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.pushButtonScan.setStyleSheet("QPushButton {\n"
                                         "    border: 2px solid;\n"
                                         "    border-color:    black;\n"
                                         "     border-radius: 15px;\n"
                                         "    background-color:#FF9408\n"
                                         "}\n"
                                         "QPushButton:hover {\n"
                                         "    border: 2px solid #656565;\n"
                                         "    color: #656565; \n"
                                         "}\n"
                                         "QPushButton:hover, QPushButton:checked {\n"
                                         "    opacity: 0;\n"
                                         "}")
        self.pushButtonScan.setObjectName("pushButtonScan")
        self.comboBox = QtWidgets.QComboBox(Form)
        self.comboBox.setGeometry(QtCore.QRect(460, 50, 121, 41))
        font = QtGui.QFont()
        font.setFamily("Segoe UI Semibold")
        font.setPointSize(11)
        font.setBold(True)
        font.setWeight(75)
        self.comboBox.setFont(font)
        self.comboBox.setStyleSheet("QComboBox {\n"
                                    "    border: 2px solid;\n"
                                    "    border-color:    black;\n"
                                    "     border-radius: 15px;\n"
                                    "    background-color:#FF9408\n"
                                    "}")
        self.comboBox.setObjectName("comboBox")
        self.comboBox.addItem("")
        self.comboBox.addItem("")
        self.comboBox.addItem("")
        self.comboBox.addItem("")

        # Tasarım dosyanızda QTextBrowser ekleyin ve adını textBrowserOpenPorts olarak belirtin
        self.textBrowserOpenPorts = QtWidgets.QTextBrowser(Form)
        self.textBrowserOpenPorts.setGeometry(QtCore.QRect(40, 160, 730, 300))
        font = QtGui.QFont()
        font.setFamily("Segoe UI Semibold")
        font.setPointSize(11)
        font.setBold(True)
        font.setWeight(75)
        self.textBrowserOpenPorts.setFont(font)
        self.textBrowserOpenPorts.setStyleSheet("QTextBrowser {\n"
                                                "    border: 1px solid black;\n"
                                                "    border-color:    black;\n"
                                                "    background-color:#F7A100\n"
                                                "}")


        self.retranslateUi(Form)
        QtCore.QMetaObject.connectSlotsByName(Form)

    def retranslateUi(self, Form):
        _translate = QtCore.QCoreApplication.translate
        Form.setWindowTitle(_translate("Form", "Portscanner"))
        self.lineEditIp.setText(_translate("Form", ""))
        self.lineEditStartPort.setText(_translate("Form", ""))
        self.lineEditLastPort.setText(_translate("Form", ""))
        self.label.setText(_translate("Form", "IP:"))
        self.label_2.setText(_translate("Form", "PORTS:"))
        self.pushButtonScan.setText(_translate("Form", "BAŞLA"))
        self.comboBox.setItemText(0, _translate("Form", "Service Scan"))
        self.comboBox.setItemText(1, _translate("Form", "TCP Scan"))
        self.comboBox.setItemText(2, _translate("Form", "OS Scan"))
        self.comboBox.setItemText(3, _translate("Form", ""))
