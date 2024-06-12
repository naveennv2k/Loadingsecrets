#!/bin/bash
 


set -e

# Install op-cli
install_op_cli() {
  # Create a temporary directory where the CLI is installed
    
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    curl  https://downloads.zohocdn.com/vault-cli-desktop/linux/zv_cli.zip --output $GITHUB_WORKSPACE/zv_cli.zip
    cd $GITHUB_WORKSPACE
    ls -a
    unzip zv_cli.zip
    rm zv_cli.zip
    ./zv login
   
    if [[ "$ARCH" != "386" ]] && [[ "$ARCH" != "amd64" ]] && [[ "$ARCH" != "arm" ]] && [[ "$ARCH" != "arm64" ]]; then
      echo "Unsupported architecture for the 1Password CLI: $ARCH."
      exit 1
    fi
    

    
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    curl  https://downloads.zohocdn.com/vault-cli-desktop/macos/zv_cli.zip --output $GITHUB_WORKSPACE/zv_cli.zip
    cd $GITHUB_WORKSPACE
    unzip zv_cli.zip
    rm zv_cli.zip
    ./zv login
  else
    echo "Operating system not supported yet for this GitHub Action: $OSTYPE."
    exit 1
  fi
}

install_op_cli