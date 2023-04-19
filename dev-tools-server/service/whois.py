import whois

def query_whois(url: str):
    res = whois.whois(url=url)
    print(res)