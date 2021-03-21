#include <dht.h>

dht DHT;

#define DHT11_PIN 7

void setup()
{
  // 設定 baud rate 為 9600
  Serial.begin(9600);
}

void loop()
{
  DHT.read11(DHT11_PIN);
  sprintf(output, "{ \"temperature\": %.2f, \"humidity\": %.2f }", DHT.temperature, DHT.humidity);
  Serial.write(output);
  delay(1000);
}