import sys


class ShutUp:
    '''
    Used to manage shut up periods, cause Google Chrome reads everypthing from Native app

    Use talk_to_term to address all output to stdout
    and talk_to_google to restore output to google chrome
    '''

    def __init__(self):
        self.current_stdout = sys.stdout

    def talk_to_term(self):
        self.current_stdout = sys.stdout
        sys.stdout.flush()
        sys.stdout = sys.stderr

    def talk_to_google(self):
        sys.stdout.flush()
        sys.stdout = self.current_stdout
