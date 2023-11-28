import jieba as jieba
import np as np
import pandas as pd


def one_hot(docs: list):
    if len(docs) == 0:
        return

    words = []
    for i in range(len(docs)):
        docs[i] = jieba.lcut(docs[i].strip("\n"))
        words += docs[i]

    vocab = sorted(set(words), key=words.index)
    M = len(docs)

    V = len(vocab)
    onehot = np.zeros((M, V))
    for i, doc in enumerate(docs):
        for word in doc:
            if word in vocab:
                pos = vocab.index(word)
                onehot[i][pos] = 1
    onehot = pd.DataFrame(onehot, columns=vocab)
    return onehot




print(one_hot([
    "John likes to watch moives, Mary likes too.",
    "John also likes to watch football games."
]))