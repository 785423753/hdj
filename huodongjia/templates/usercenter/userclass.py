import json
class UserInfo():
    def __init__(self, uid, avatar, name):
        self.uid = uid 
        self.avatar = avatar 
        self.name = name


class UserEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UserInfo):
            return obj.name
        return json.JSONEncoder.default(self, obj)
