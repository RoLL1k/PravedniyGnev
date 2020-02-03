from datetime import datetime
from os.path import splitext


def get_timestamp_path(instance, filename):
    return '{}{}'.format(datetime.now().timestamp(), splitext(filename)[1])
