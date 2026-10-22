"""Red Neuronal Multicapa para predicción de consumo energético.

Proyecto Final - Seminario de Sistemas II
Raúl Hernández Nuñez · 2173770 · IAS · Grupo 002

Clase NeuralNetwork implementada desde cero con NumPy (sin TensorFlow,
Keras ni PyTorch). Es la misma clase de notebooks/red_neuronal.ipynb
(Sección 3); el notebook es la fuente de la verdad.

Uso:
    from red_neuronal import NeuralNetwork
    red = NeuralNetwork([6, 16, 8, 1], learning_rate=0.01, init="he")
    red.train(X_train, y_train, epochs=5000, X_val=X_val, y_val=y_val)
    pred = red.predict(X_test)
"""

import numpy as np

SEED = 42


class NeuralNetwork:
    '''Red neuronal multicapa (MLP) para regresión, implementada solo con NumPy.

    Arquitectura usada en el proyecto: [6, 16, 8, 1]
      - Capas ocultas con activación ReLU
      - Capa de salida lineal (regresión de un valor continuo)
    Entrenamiento: MSE + backpropagation + gradient descent (batch completo).
    '''

    def __init__(self, layer_dims, learning_rate=0.01, init="he", seed=SEED):
        '''layer_dims: lista con el número de neuronas por capa, p. ej. [6, 16, 8, 1].
        learning_rate: tamaño del paso de gradient descent.
        init: "he" (recomendado para ReLU) o "small" (Normal(0, 0.01)).'''
        self.layer_dims = layer_dims
        self.learning_rate = learning_rate
        self.init = init
        self.rng = np.random.default_rng(seed)
        self.params = {}      # W1, b1, W2, b2, W3, b3
        self.cache = {}       # valores intermedios del forward (para backprop)
        self.gradients = {}   # dW1, db1, ... calculados en backward
        self.loss_history = []
        self.val_loss_history = []
        self.initialize_weights()

    def initialize_weights(self):
        '''Crea W (aleatorios pequeños) y b (ceros) para cada capa.
        W_l tiene forma (neuronas capa anterior, neuronas capa l).'''
        for l in range(1, len(self.layer_dims)):
            n_in, n_out = self.layer_dims[l - 1], self.layer_dims[l]
            std = np.sqrt(2.0 / n_in) if self.init == "he" else 0.01
            self.params[f"W{l}"] = self.rng.normal(0.0, std, size=(n_in, n_out))
            self.params[f"b{l}"] = np.zeros((1, n_out))

    @staticmethod
    def relu(z):
        '''ReLU: max(0, z) elemento a elemento.'''
        return np.maximum(0, z)

    @staticmethod
    def relu_derivative(z):
        '''Derivada de ReLU: 1 donde z > 0, 0 en otro caso.'''
        return (z > 0).astype(float)

    def forward(self, X):
        '''Propagación hacia adelante. Guarda z y a de cada capa en self.cache
        y regresa la predicción a3 con forma (m, 1).'''
        p = self.params
        z1 = X @ p["W1"] + p["b1"]
        a1 = self.relu(z1)
        z2 = a1 @ p["W2"] + p["b2"]
        a2 = self.relu(z2)
        z3 = a2 @ p["W3"] + p["b3"]
        a3 = z3  # salida lineal: sin activación
        self.cache = {"X": X, "z1": z1, "a1": a1, "z2": z2, "a2": a2, "z3": z3}
        return a3

    @staticmethod
    def mse(predictions, y):
        '''Error cuadrático medio.'''
        return float(np.mean((predictions - y) ** 2))

    def backward(self, X, y, predictions):
        '''Retropropagación: calcula dL/dW y dL/db de las tres capas
        aplicando la regla de la cadena desde la salida hacia la entrada.'''
        m = X.shape[0]
        p, c = self.params, self.cache

        # Capa de salida (lineal). Derivada de MSE respecto a la predicción.
        dz3 = (2.0 / m) * (predictions - y)                 # (m, 1)
        dW3 = c["a2"].T @ dz3                               # (8, 1)
        db3 = dz3.sum(axis=0, keepdims=True)                # (1, 1)

        # Capa oculta 2 (ReLU)
        dz2 = (dz3 @ p["W3"].T) * self.relu_derivative(c["z2"])  # (m, 8)
        dW2 = c["a1"].T @ dz2                                     # (16, 8)
        db2 = dz2.sum(axis=0, keepdims=True)                      # (1, 8)

        # Capa oculta 1 (ReLU)
        dz1 = (dz2 @ p["W2"].T) * self.relu_derivative(c["z1"])  # (m, 16)
        dW1 = X.T @ dz1                                           # (6, 16)
        db1 = dz1.sum(axis=0, keepdims=True)                      # (1, 16)

        self.gradients = {"W1": dW1, "b1": db1, "W2": dW2, "b2": db2,
                          "W3": dW3, "b3": db3}

    def update_weights(self):
        '''Gradient descent: parámetro = parámetro - learning_rate * gradiente.'''
        for nombre, grad in self.gradients.items():
            self.params[nombre] -= self.learning_rate * grad

    def train(self, X_train, y_train, epochs, X_val=None, y_val=None, print_every=500):
        '''Loop de entrenamiento con batch completo.
        En cada época: forward -> loss -> backward -> actualizar pesos.'''
        for epoch in range(1, epochs + 1):
            pred = self.forward(X_train)
            loss = self.mse(pred, y_train)
            self.backward(X_train, y_train, pred)
            self.update_weights()
            self.loss_history.append(loss)

            # Loss de validación (solo se mide, no se usa para entrenar)
            if X_val is not None:
                self.val_loss_history.append(self.mse(self.predict(X_val), y_val))

            if print_every and (epoch == 1 or epoch % print_every == 0):
                msg = f"Época {epoch:>5}/{epochs} | loss train: {loss:.4f}"
                if X_val is not None:
                    msg += f" | loss val: {self.val_loss_history[-1]:.4f}"
                print(msg)
        return self.loss_history

    def predict(self, X):
        '''Predicción para nuevos datos (forward sin modificar la caché de entrenamiento).'''
        cache_entrenamiento = self.cache
        pred = self.forward(X)
        self.cache = cache_entrenamiento
        return pred


if __name__ == "__main__":
    # Prueba rápida con datos aleatorios: el loss debe bajar
    rng = np.random.default_rng(SEED)
    X = rng.normal(size=(200, 6))
    y = (X[:, :1] ** 2 - X[:, 1:2]) + rng.normal(scale=0.1, size=(200, 1))
    red = NeuralNetwork([6, 16, 8, 1], learning_rate=0.01, init="he")
    red.train(X, y, epochs=2000, print_every=500)
