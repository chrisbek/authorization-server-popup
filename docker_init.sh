#!/bin/bash

yarn install
chmod -R 755 node_modules/
exec yarn run dev